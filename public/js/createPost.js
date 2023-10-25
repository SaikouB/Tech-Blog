const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.newpost-title-input').value.trim();
    const post_text = document.querySelector('.text-input').value.trim();
    // const post_date = document.querySelector('#post_date').value.trim();

    if (title && post_text) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Cannot create post');
        }
    };
};

const cancelPost = (event) => {
    event.preventDefault();
    document.location.replace('/');
}

document.querySelector('#create-post').addEventListener('submit', newPost);
document.querySelector('#cancel-post-btn').addEventListener('click', cancelPost);