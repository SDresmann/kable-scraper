import axios from 'axios';

app.get('/api/test-site', async (req, res) => {
    try {
        const response = await axios.get('https://kableacademy.com/');
        console.log('Site is accessible. HTML content:', response.data);
        res.send('Site is accessible.');
    } catch (error) {
        console.error('Error accessing the site:', error);
        res.status(500).send('Site is not accessible.');
    }
});
