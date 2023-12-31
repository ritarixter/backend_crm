import { IsString } from "class-validator"

export class DeleteFileDto {
    @IsString()
    filePath: string

    @IsString()
    access: string
}