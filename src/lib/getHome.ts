export const getHome = async (userid: number, page: number, limit: number) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts/getHome`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid, page, limit }),
    }
  ).then((res) => res.json())

  return result
}
