export const Z_INDEX = {
  // common
  behind: -1,
  base: 1,
  raised: 2,
  elevated: 3,
  foreground: 4,
  localUnderlay: 9,
  localOverlay: 10,
  localOverlayRaised: 11,

  // component
  appBar: 99,
  sheetContent: 999,
  navigation: 1000,
  sticky: 1001,
  contextual: 1002,
  notification: 9999,
  overlay: 10000,
  popover: 10001,
  popoverRaised: 10002,
  modal: 99999,
  tooltip: 100001,
  modalRaised: 100002,
  toast: 1000000,
  bottomSheet: 100000000,
  activeSlide: 123123123,
  dimmed: 999999999,
} as const;
