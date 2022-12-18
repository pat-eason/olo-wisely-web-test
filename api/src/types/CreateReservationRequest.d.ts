export default interface CreateReservationRequest {
  email: string
  name: string
  partySize: number
  reservationDateTime: string
  restaurantId: number
}
