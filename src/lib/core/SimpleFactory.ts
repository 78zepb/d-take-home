import { HttpClient } from './HttpClient';

class SimpleFactory {

  create(type: string) {
    switch (type) {
      case 'http':
        return new HttpClient();

      default:
        throw Error('SimpleFactory unknown type')
        break;
    }

  }
}

export default new SimpleFactory();
