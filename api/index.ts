export default async (request: Request) => {
  try {
    // Import the built server entry
    const { default: serverEntry } = await import('../dist/server/index.js');
    
    // Call the server handler
    const response = await serverEntry.fetch(request, {}, {});

    return response;
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
