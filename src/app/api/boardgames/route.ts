import {queryDB} from '../../config/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const results = await queryDB('SELECT * FROM Boardgames.Boardgames');
        return NextResponse.json(results);
    } catch (err : any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

