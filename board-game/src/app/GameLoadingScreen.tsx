import desktopBackground from '../assets/loading/game-loading-desktop.webp'
import mobileBackground from '../assets/loading/game-loading-mobile.webp'
import './GameLoadingScreen.css'
import { LoadingInstallInvitation } from './LoadingInstallInvitation'
import type { loadingInstall } from './loadingInstall'

const spokes = Array.from({ length: 12 }, (_, index) => index)

export function GameLoadingScreen({ installInvitationAllowed = true, installController }: { installInvitationAllowed?: boolean; installController?: typeof loadingInstall }) {
  return (
    <><main className="game-loading-screen" role="status" aria-label="Đang tải ván cờ">
      <picture className="game-loading-background" aria-hidden="true">
        <source media="(max-width: 800px)" srcSet={mobileBackground} />
        <img src={desktopBackground} alt="" />
      </picture>
      <div className="game-loading-shade" aria-hidden="true" />
      <div className="game-loading-indicator" aria-hidden="true">
        <svg viewBox="0 0 88 88" className="game-loading-spinner">
          {spokes.map((index) => (
            <rect
              key={index}
              x="39"
              y="4"
              width="10"
              height="21"
              rx="5"
              transform={`rotate(${index * 30} 44 44)`}
              style={{ opacity: 0.22 + index * 0.065 }}
            />
          ))}
        </svg>
      </div>
      <span className="game-loading-sr-only">Đang tải ván cờ...</span>
    </main>{installInvitationAllowed && <LoadingInstallInvitation controller={installController} />}</>
  )
}
