import { NamespacedReactiveRecords, functionGenerator } from '..'
import { addDataExtension } from '../core'

const once = 'once',
  full = 'full',
  half = 'half'

export function addIntersectsExtension() {
  addDataExtension('intersects', {
    allowedModifiers: [once, full, half],
    withExpression: ({ name, el, expression, dataStack, hasMod, reactivity: { effect, onCleanup } }) => {
      const signalFn = functionGenerator(expression)
      const fn = () => signalFn(dataStack)

      const options = { threshold: 0 }
      if (hasMod(full)) options.threshold = 1
      else if (hasMod(half)) options.threshold = 0.5

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fn()

            if (hasMod(once)) {
              observer.disconnect()
            }
          }
        })
      }, options)

      const elementData: NamespacedReactiveRecords = {
        on: {
          [name]: effect(() => {
            observer.observe(el)

            onCleanup(() => {
              observer.disconnect()
            })
          }),
        },
      }

      return elementData
    },
  })
}
