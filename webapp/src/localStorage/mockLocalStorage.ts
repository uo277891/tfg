const mockLocalStorageForTest = (function () {
    let store:any = {};
  
    return {
      getItem(key: any) {
        return store[key];
      },
  
      setItem(key: any, value: any) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key: any) {
        delete store[key];
      },
  
      getAll() {
        return store;
      },
    };
  })();
  
  Object.defineProperty(window, "localStorage", { value: mockLocalStorageForTest });

  export default mockLocalStorageForTest;