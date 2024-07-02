import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server'

export async function GET() {
    const dir = path.join(process.cwd(), 'public/images/home_carousel');

    try{
        const images = await fs.promises.readdir(dir);
        return NextResponse.json({slides: images});
    } catch(err){
        console.error("Error reading directory: ", err);
        return NextResponse.json({error: "Failed to retrieve slides"}, {status: 500});
    }
}