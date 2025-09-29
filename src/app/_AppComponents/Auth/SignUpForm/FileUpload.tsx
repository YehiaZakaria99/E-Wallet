"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldErrors, UseFormRegister } from "react-hook-form"
// import { idCardInput } from "@/interfaces/auth/signupInputs.types"
import ShowError from "../ShowError"


/* // type FileUploadPropsType = {
    // register: UseFormRegister<idCardInput>;
    // errors: FieldErrors<idCardInput>
// } */

// export default function FileUpload({ register, errors }: FileUploadPropsType) {
//     const [fileName, setFileName] = useState<string>("");
//     const [isDragging, setIsDragging] = useState<boolean>(false);
//     const InputRef = useRef<HTMLInputElement>(null);


//     const handleFiles = (files: FileList | null) => {
//         if (files?.[0]) {
//             setFileName(files[0].name)
//         } else {
//             setFileName("")
//         }
//     }

//     return (
//         <div className="flex flex-col items-center gap-4">
//             <Input
//                 {...register("idCard", {
//                     validate: (value) =>
//                         value && value.length > 0 || "ID Card is required",
//                 })}
//                 id="idCard"
//                 type="file"
//                 multiple
//                 className="hidden"
//                 ref={(e) => {
//                     register("idCard").ref(e);
//                     InputRef.current = e
//                 }}
//                 onChange={(e) => {
//                     register("idCard").onChange(e);
//                     handleFiles(e.target.files)
//                 }}
//             />

//             <label
//                 htmlFor="idCard"
//                 onDragOver={(e) => {
//                     e.preventDefault()
//                     setIsDragging(true)
//                 }}
//                 onDrop={(e) => {
//                     e.preventDefault()
//                     setIsDragging(false)
//                     const files = e.dataTransfer.files
//                     handleFiles(files)

//                     if (InputRef.current) {
//                         const dt = new DataTransfer()
//                         Array.from(files).forEach((file) => dt.items.add(file))
//                         InputRef.current.files = dt.files
//                         InputRef.current.dispatchEvent(new Event("change", { bubbles: true }))
//                     }

//                 }}
//                 onDragLeave={() => setIsDragging(false)}
//                 className={`cursor-pointer w-full max-w-sm p-6 py-20 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition
//                 ${isDragging ? "border-primary bg-primary/10 text-primary" : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"}`}
//             >
//                 <span className="text-sm">Click or Drag & Drop to upload</span>
//             </label>
//             {fileName && (
//                 <p className="text-sm text-green-600">✅ {fileName}</p>
//             )}
//             <ShowError error={errors.idCard} />
//         </div>
//     )
// }