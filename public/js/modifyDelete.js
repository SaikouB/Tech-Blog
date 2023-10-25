const modifyPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.title-input').value.trim();
    const post_text = document.querySelector('.text-input').value.trim();

    if (title && post_text) {
        const response = await fetch ('/api/post/modifyDelete', {
            method: 'PUT',
            body: JSON.stringify({  title, post_text }),
            headers: { 'Content-type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard/post/');
        } else {
            alert('Cannot update post');
        }
    };
};

document.querySelector('.modify-post').addEventListener('submit', modifyPost)