package smoketests

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestExampleDialogsBrowser(t *testing.T) {
	g := setup(t)

	page := g.page("examples/dialogs_browser")
	assert.NotNil(t, page)

	t.Run("launch dialog", func(t *testing.T) {
		btn := page.MustElement("#dialogs")
		page.MustWaitIdle()

		wait, handle := page.MustHandleDialog()
		go btn.MustClick()

		//i don't know why this is needed but wait isn't enough
		time.Sleep(1 * time.Second)

		wait()
		handle(true, "test")
		handle(true, "")
		page.MustWaitIdle()

		confirmation := page.MustElement("#confirmation")
		confirmationText := confirmation.MustText()
		assert.Equal(t, "test", confirmationText)
	})
}
