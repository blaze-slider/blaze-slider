import { Automata } from '../src/automata/automata'

describe('slider', () => {
  test('loop false', () => {
    const slider = new Automata(7, {
      slidesToScroll: 3,
      slidesToShow: 3,
      loop: false,
    })

    expect(slider.totalSlides).toBe(7)

    // config
    expect(slider.config).toEqual({
      slidesToScroll: 3,
      slidesToShow: 3,
      loop: false,
    })

    expect(slider.isStatic).toBe(false)
    expect(slider.isTransitioning).toBe(false)
    expect(slider.stateIndex).toBe(0)
  })

  test('loop true', () => {
    const slider = new Automata(7, {
      slidesToScroll: 3,
      slidesToShow: 3,
      loop: true,
    })

    expect(slider.totalSlides).toBe(7)

    // config
    expect(slider.config).toEqual({
      slidesToScroll: 3,
      slidesToShow: 3,
      loop: true,
    })

    expect(slider.isStatic).toBe(false)
    expect(slider.isTransitioning).toBe(false)
    expect(slider.stateIndex).toBe(0)
  })
})
