/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    email: string;

    @Column('text', {
        nullable: false,
        select: false
    })
    password: string;

    @Column('text')
    fullName: string

     @Column('boolean', {
         default: true
     })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user'],

    })
    roles: string[];
}
