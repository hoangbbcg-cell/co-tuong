export function notificationInviteKey(accountId: string | number): string {
  return `hovang-notification-invite-v1:${String(accountId)}`
}
export function shouldOfferNotificationInvite(input: {
  authenticated: boolean
  onHome: boolean
  supported: boolean
  permission: NotificationPermission | 'unsupported'
  previouslyDismissed: boolean
}): boolean {
  return input.authenticated && input.onHome && input.supported &&
    input.permission === 'default' && !input.previouslyDismissed
}
