export const getNotifications = async (id: number) => {
  let data
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notifications/getNotifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }
    )
    data = await response.json()
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
  return data
}
