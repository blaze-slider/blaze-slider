import { Automata } from '../src/automata/automata'

describe('loop: true', () => {
  test('7 / 3 / 3', () => {
    const slider = new Automata(7, {
      slidesToShow: 3,
      slidesToScroll: 3,
      loop: true,
    })

    // 0: 0 1 2
    // 1: 3 4 5
    // 2: 6 0 1

    expect(slider.states.length).toBe(3)
    expect(slider.states).toEqual([
      {
        page: [0, 2],
        next: {
          stateIndex: 1,
          moveSlides: 3,
        },
        prev: {
          stateIndex: 2,
          moveSlides: 1,
        },
      },
      {
        page: [3, 5],
        next: {
          stateIndex: 2,
          moveSlides: 3,
        },
        prev: {
          stateIndex: 0,
          moveSlides: 3,
        },
      },
      {
        page: [6, 1],
        next: {
          stateIndex: 0,
          moveSlides: 1,
        },
        prev: {
          stateIndex: 1,
          moveSlides: 3,
        },
      },
    ])
  })

  test('7 / 3 / 2', () => {
    const slider = new Automata(7, {
      slidesToShow: 3,
      slidesToScroll: 2,
      loop: true,
    })

    // 0: 0 1 2
    // 1: 2 3 4
    // 2: 4 5 6
    // 3: 6 0 1

    expect(slider.states.length).toBe(4)
    expect(slider.states).toEqual([
      {
        page: [0, 2],
        next: {
          stateIndex: 1,
          moveSlides: 2,
        },
        prev: {
          stateIndex: 3,
          moveSlides: 1,
        },
      },
      {
        page: [2, 4],
        next: {
          stateIndex: 2,
          moveSlides: 2,
        },
        prev: {
          stateIndex: 0,
          moveSlides: 2,
        },
      },
      {
        page: [4, 6],
        next: {
          stateIndex: 3,
          moveSlides: 2,
        },
        prev: {
          stateIndex: 1,
          moveSlides: 2,
        },
      },
      {
        page: [6, 1],
        next: {
          stateIndex: 0,
          moveSlides: 1,
        },
        prev: {
          stateIndex: 2,
          moveSlides: 2,
        },
      },
    ])
  })

  test('5 / 3 / 2', () => {
    const slider = new Automata(5, {
      slidesToShow: 3,
      slidesToScroll: 2,
      loop: true,
    })

    // 0: 0 1 2
    // 1: 2 3 4
    // 2: 4 0 1

    expect(slider.states.length).toBe(3)
    expect(slider.states).toEqual([
      {
        page: [0, 2],
        next: {
          stateIndex: 1,
          moveSlides: 2,
        },
        prev: {
          stateIndex: 2,
          moveSlides: 1,
        },
      },
      {
        page: [2, 4],
        next: {
          stateIndex: 2,
          moveSlides: 2,
        },
        prev: {
          stateIndex: 0,
          moveSlides: 2,
        },
      },
      {
        page: [4, 1],
        next: {
          stateIndex: 0,
          moveSlides: 1,
        },
        prev: {
          stateIndex: 1,
          moveSlides: 2,
        },
      },
    ])
  })

  test('3 / 3 / * - static', () => {
    const slider = new Automata(3, {
      slidesToShow: 3,
      slidesToScroll: 1,
      loop: true,
    })

    expect(slider.states.length).toBe(1)
    expect(slider.isStatic).toBe(true)

    expect(slider.states).toEqual([
      {
        page: [0, 2],
        next: {
          moveSlides: 0,
          stateIndex: 0,
        },
        prev: {
          moveSlides: 0,
          stateIndex: 0,
        },
      },
    ])
  })

  test('3 / 4 / * - static', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()

    const slider = new Automata(3, {
      slidesToShow: 4,
      slidesToScroll: 1,
      loop: true,
    })

    expect(slider.states.length).toBe(1)
    expect(slider.isStatic).toBe(true)

    // expect the config to be fixed
    expect(slider.config.slidesToShow).toBe(3) // corrected from 4 -> 3

    expect(slider.states).toEqual([
      {
        page: [0, 2],
        next: {
          moveSlides: 0,
          stateIndex: 0,
        },
        prev: {
          moveSlides: 0,
          stateIndex: 0,
        },
      },
    ])

    expect(consoleWarnMock).toHaveBeenCalledWith(
      expect.stringContaining(
        'slidesToShow can not be larger than number of slides. Setting slidesToShow = totalSlides instead.'
      )
    )

    consoleWarnMock.mockRestore()
  })
})
