import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ICharacter } from './@types/character'

@Schema({ collection: 'characters', timestamps: true })
export class Character extends Document implements ICharacter {
    @Prop({ required: true, unique: true, index: true })
    id: number

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    status: string

    @Prop({ required: true })
    species: string

    @Prop()
    type: string

    @Prop({ required: true })
    gender: string

    @Prop(raw({ name: String, url: String }))
    origin: { name: string; url: string }

    @Prop(raw({ name: String, url: String }))
    location: { name: string; url: string }

    @Prop({ required: true })
    image: string

    @Prop([String])
    episode: string[]

    @Prop({ required: true })
    url: string

    @Prop({ default: Date.now, required: true })
    createdAt: Date

    @Prop({ default: Date.now })
    updatedAt: Date
}

export const CharacterSchema = SchemaFactory.createForClass(Character)
