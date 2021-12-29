import { BlazeSlider } from '../index'

export function handleNavigation(blazeSlider: BlazeSlider) {
  const navigation = blazeSlider.config.navigation

  // navigation
  if (navigation) {
    const { prev, next } = navigation
    ;(prev as HTMLButtonElement).addEventListener('click', () =>
      blazeSlider.swipeLeft()
    )
    ;(next as HTMLButtonElement).addEventListener('click', () =>
      blazeSlider.swipeRight()
    )
  }
}
