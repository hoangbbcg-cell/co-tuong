import brownFrame from '../../../assets/room-selection/brown-card-upload.png'

/** Stretch the button artwork while keeping its four decorative corners intact. */
export function RoomDialogFrame() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 block border border-solid border-transparent [--room-dialog-border:28px] compact:[--room-dialog-border:20px]" style={{
    borderImageSource: `url(${brownFrame})`,
    borderImageSlice: '160 fill',
    borderImageWidth: 'var(--room-dialog-border)',
    borderImageRepeat: 'stretch',
  }} />
}
