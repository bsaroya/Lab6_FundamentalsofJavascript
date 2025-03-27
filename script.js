const fetchUserProfile = () => new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.2 ? resolve({ id: 1, name: "John Doe" }) : reject("Failed to fetch user profile"), 1000);
});

const fetchPosts = (userId) => new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.2 ? resolve([{ id: 101, title: "Post 1" }, { id: 102, title: "Post 2" }]) : reject("Failed to fetch posts"), 1200);
});

const fetchComments = (postId) => new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.2 ? resolve([{ id: 201, text: "nice post" }, { id: 202, text: "Nice article" }]) : reject("Failed to fetch comments"), 800);
});

async function fetchSequentially() {
    try {
        console.log("Fetching user profile...");
        const user = await fetchUserProfile();
        console.log("User profile retrieved:", user);

        console.log("Fetching posts...");
        const posts = await fetchPosts(user.id);
        console.log("Posts retrieved:", posts);

        console.log("Fetching comments for the first post...");
        const comments = await fetchComments(posts[0].id);
        console.log("Comments retrieved:", comments);

        console.log("Sequential fetching complete.");
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchInParallel() {
    try {
        console.log("Fetching data in parallel...");
        const [user, posts] = await Promise.all([
            fetchUserProfile(),
            fetchPosts(1)
        ]);
        
        const comments = await fetchComments(posts[0].id); 
        console.log("User:", user);
        console.log("Posts:", posts);
        console.log("Comments:", comments);
        console.log("Parallel fetching complete.");
    } catch (error) {
        console.error("Error in parallel fetching:", error);
    }
}

async function getUserContent() {
    console.log("Starting user content retrieval...");
    await fetchSequentially(); 
    await fetchInParallel();   
}

getUserContent();
