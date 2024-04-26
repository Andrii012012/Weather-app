
export default function addArrayHTML(array, section){
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim().replace(/(\r\n|\n|\r)/gm, "");
        section.insertAdjacentHTML('beforeend', array[i]);
    }
}