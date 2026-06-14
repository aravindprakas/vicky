// Select Vercel's Edge runtime here (not via vercel.json `functions.runtime`,
// which expects a versioned Node runtime and rejects "edge"). The built server
// entry is a Cloudflare-style Web `fetch` handler, so the edge runtime fits.
export const config = { runtime: "edge" };

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
