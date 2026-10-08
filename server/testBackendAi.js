import fetch from 'node-fetch';

async function test() {
  try {
    // We need to fetch from http://localhost:5000/api/admin/ai/generate
    // But this route requires authentication. 
    // Let's just check if the server is up.
    const res = await fetch('http://localhost:5000/api/health');
    console.log('Health check:', await res.text());
  } catch (err) {
    console.error('Error:', err.message);
  }
}
test();
