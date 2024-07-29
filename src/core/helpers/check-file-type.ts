export const  checkFileType = (file: File) =>
{
    if (file?.name)
    {
        const fileType = file.name.split(".").pop();
        if (fileType === "docx" || fileType === "pdf") return true;
    }
    return false;
};
