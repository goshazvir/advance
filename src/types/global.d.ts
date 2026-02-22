/* eslint-disable @typescript-eslint/no-explicit-any */
// Extend the existing ScreenOrientation interface
declare interface ScreenOrientation {
  lock(orientation: OrientationLockType): Promise<void>;
  type: OrientationType;
  addEventListener(
    type: 'change',
    listener: (this: ScreenOrientation, ev: Event) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: 'change',
    listener: (this: ScreenOrientation, ev: Event) => any,
    options?: boolean | EventListenerOptions,
  ): void;
}

// Extend the Screen interface to include the orientation property
declare interface Screen {
  orientation: ScreenOrientation;
}
