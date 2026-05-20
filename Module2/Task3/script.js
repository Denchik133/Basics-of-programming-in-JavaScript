async function fetchUserPosts(userId) {
    try {
        const userResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        )
        if (!userResponse.ok) {
            throw new Error("User request failed")
        }
        const user = await userResponse.json()
        const postsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        )
        if (!postsResponse.ok) {
            throw new Error("Posts request failed")
        }
        const posts = await postsResponse.json()
        return {
            name: user.name,
            email: user.email,
            postsCount: posts.length
        }
    } catch (e) {
        return {
            error: "Не вдалося завантажити дані"
        }
    }
}
async function loadUser() {
    const result = document.getElementById("result")
    const userId = Number(
        document.getElementById("userId").value
    )
    if (isNaN(userId) || userId <= 0) {
        result.textContent = "Enter valid user id"
        return
    }
    result.textContent = "Loading..."
    const data = await fetchUserPosts(userId)
    result.textContent = JSON.stringify(data, null, 4)
}