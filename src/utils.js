export const logNotes = notes => {
    if (!!notes || !notes.length > 0) {
        console.log("No notes found");
    };

    notes.forEach(({ id, content, tags }) => {
        console.log('\n');
        console.log("id: ", id);
        tags.length > 0 && console.log("tags: ", tags);
        console.log("content: ", content);
    });
}