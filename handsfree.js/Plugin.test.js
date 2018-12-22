/**
 * Handsfree.prototype.use
 */
describe('Handsfree.prototype.use', () => {
  it('adds .enable()/.disable methods', () => {
    const handsfree = new Handsfree()
    const pluginConf = {
      name: 'testPlugin',
      onDisable: jest.fn(),
      onEnable: jest.fn()
    }
    const plugin = handsfree._use(pluginConf)

    expect(plugin.disable).toBeTruthy()
    plugin._isDisabled = false
    plugin.disable()
    expect(pluginConf.onDisable).toHaveBeenCalled()
    expect(plugin._isDisabled).toBeTruthy()

    expect(plugin.enable).toBeTruthy()
    plugin._isDisabled = false
    plugin.enable()
    expect(pluginConf.onEnable).toHaveBeenCalled()
    expect(plugin._isDisabled).toBeFalsy()
  })

  it('calls onUse', () => {
    const handsfree = new Handsfree()
    const enabled = {
      name: 'testPlugin',
      _isDisabled: true,
      onUse: jest.fn()
    }
    const disabled = {
      name: 'testPlugin',
      onUse: jest.fn()
    }

    handsfree._use(enabled)
    handsfree._use(disabled)
    
    setTimeout(() => {
      expect(enabled.onUse).not.toHaveBeenCalled()
      expect(disabled.onUse).toHaveBeenCalled()
    }, 0)
  })

  it('responds to handsfree mouse events', () => {
    const handsfree = new Handsfree()
    const enabled = {
      name: 'testPlugin-enabled',
      onMouseDown: jest.fn(),
      onMouseDrag: jest.fn(),
      onMouseUp: jest.fn()
    }
    const disabled = {
      name: 'testPlugin-disabled',
      _isDisabled: true,
      onMouseDown: jest.fn(),
      onMouseDrag: jest.fn(),
      onMouseUp: jest.fn()
    }
    handsfree.faces = Handsfree._mock.faces
    handsfree._use(enabled)
    handsfree._use(disabled)
    
    window.dispatchEvent(new CustomEvent('handsfree:mouseDown', {detail: {}}))
    window.dispatchEvent(new CustomEvent('handsfree:mouseDrag', {detail: {}}))
    window.dispatchEvent(new CustomEvent('handsfree:mouseUp', {detail: {}}))

    expect(enabled.onMouseDown).toHaveBeenCalled()
    expect(enabled.onMouseDrag).toHaveBeenCalled()
    expect(enabled.onMouseUp).toHaveBeenCalled()
    expect(disabled.onMouseDown).not.toHaveBeenCalled()
    expect(disabled.onMouseDrag).not.toHaveBeenCalled()
    expect(disabled.onMouseUp).not.toHaveBeenCalled()
  })

  it('hooks run only for enabled plugins', () => {
    const handsfree = new Handsfree()
    const enabled = {
      name: 'testPlugin-enabled',
      onStop: jest.fn(),
      onStart: jest.fn(),
      onUse: jest.fn()
    }
    const disabled = {
      name: 'testPlugin-disabled',
      _isDisabled: true,
      onStop: jest.fn(),
      onStart: jest.fn(),
      onUse: jest.fn()
    }

    handsfree._use(enabled)
    handsfree._use(disabled)
    handsfree.onStopHooks()
    handsfree.onStartHooks()
    handsfree.onFrameHooks()

    setTimeout(() => {
      expect(enabled.onUse).toHaveBeenCalled()
      expect(disabled.onUse).not.toHaveBeenCalled()
    }, 0)
  })

  it('updates faces when returning faces from frameHooks', () => {
    const handsfree = new Handsfree()
    handsfree.faces = [[], [], []]

    handsfree._use({
      name: 'testPlugin',
      onFrame: () => [[]]
    })
    handsfree._onFrameHooks()

    expect(handsfree.faces.length).toBe(1)
  })

  it('prioritizes plugins by .priority', () => {
    const handsfree = new Handsfree()
    Handsfree._mock.plugins(handsfree)
    expect(Handsfree._mock.spy.onUse[0]).toBe('test-plugin-a')
  })
})