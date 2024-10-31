package site

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/a-h/templ"
	"github.com/delaneyj/toolbelt"
	"github.com/go-chi/chi/v5"
	"github.com/go-sanitize/sanitize"
	"github.com/gorilla/sessions"
	"github.com/samber/lo"
)

var (
	sanitizer *sanitize.Sanitizer
)

func setupExamples(ctx context.Context, router chi.Router, store sessions.Store, ns *toolbelt.EmbeddedNATsServer) (err error) {
	mdElementRenderers, _, err := markdownRenders("examples")
	if err != nil {
		return err
	}

	sanitizer, err = sanitize.New()
	if err != nil {
		return fmt.Errorf("error creating sanitizer: %w", err)
	}

	sidebarGroups := []*SidebarGroup{
		{
			Label: "Ported HTMX Examples",
			Links: []*SidebarLink{
				{ID: "click_to_edit"},
			},
		},
		{
			Label: "Reactive Examples",
			Links: []*SidebarLink{
				{ID: "backoff"},
			},
		},
	}
	lo.ForEach(sidebarGroups, func(group *SidebarGroup, grpIdx int) {
		lo.ForEach(group.Links, func(link *SidebarLink, linkIdx int) {
			link.URL = templ.SafeURL("/examples/" + link.ID)
			link.Label = strings.ToUpper(strings.ReplaceAll(link.ID, "_", " "))

			if linkIdx > 0 {
				link.Prev = group.Links[linkIdx-1]
			} else if grpIdx > 0 {
				prvGrp := sidebarGroups[grpIdx-1]
				link.Prev = prvGrp.Links[len(prvGrp.Links)-1]
			}

			if linkIdx < len(group.Links)-1 {
				link.Next = group.Links[linkIdx+1]
			} else if grpIdx < len(sidebarGroups)-1 {
				nxtGrp := sidebarGroups[grpIdx+1]
				link.Next = nxtGrp.Links[0]
			}
		})
	})

	router.Route("/examples", func(examplesRouter chi.Router) {
		examplesRouter.Get("/", func(w http.ResponseWriter, r *http.Request) {
			http.Redirect(w, r, string(sidebarGroups[0].Links[0].URL), http.StatusFound)
		})

		examplesRouter.Get("/{name}", func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			name := chi.URLParam(r, "name")
			contents, ok := mdElementRenderers[name]
			if !ok {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}

			var currentLink *SidebarLink
			for _, group := range sidebarGroups {
				for _, link := range group.Links {
					if link.ID == name {
						currentLink = link
						break
					}
				}
			}

			SidebarPage(r, sidebarGroups, currentLink, contents).Render(ctx, w)
		})

		if err := errors.Join(
			setupExamplesClickToEdit(examplesRouter),
			setupExamplesBackoff(examplesRouter),
		); err != nil {
			panic(fmt.Sprintf("error setting up examples routes: %s", err))
		}
	})

	return nil
}
