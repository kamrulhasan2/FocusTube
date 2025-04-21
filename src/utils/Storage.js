class Storage {

    save(key, value){
        localStorage.setItem(key,JSON.stringify(value));
    }

    get(key){
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    }
}

const storage = new Storage();
export default storage;
