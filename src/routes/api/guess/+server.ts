export async function POST(): Promise<Response> {
    let response = await fetch('https://fr.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json');
    let json = await response.json();

    const title = json['query']['random'][0]['title'];

    response = await fetch(`https://fr.wikipedia.org/w/api.php?action=parse&prop=text&page=${title}&format=json`);
    json = await response.json();

    return new Response(JSON.stringify(json), { status: 200 });
}