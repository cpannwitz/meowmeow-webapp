export interface UserStats {
  wins: number
  losses: number
  meowpoints: number
  uid: string
  displayName: string
}

export interface OnlineUser {
  lastChanged: string
  state: string
  displayName: string
  uid?: string
}

export interface GameLastAction {
  user: string
  action: string
  timestamp: string
}

export interface GamePreConditions {
  enabled: boolean
  suspended: boolean
  toDraw: number
  newColor: string
}

export interface GameObject {
  gameId: string
  host: firebase.firestore.DocumentReference
  guest: firebase.firestore.DocumentReference
  hostName: string
  guestName: string
  winner: string
  createdAt: string
  lastActions: GameLastAction[]
  preCondition: GamePreConditions
  started: boolean
  finished: boolean
  rejected: boolean
  whichTurn: string
  hostdeckLength: number
  guestdeckLength: number
}

export interface CardObject {
  color: string
  name: string
  value: string
}
