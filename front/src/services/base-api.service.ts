export class BaseApiService {
  static headers: Headers = new Headers({
    'Content-Type': 'application/json',
  });
  static baseUrl = 'http://localhost:3000/api/';

  static buildQuery(queryObj: { [key: string]: any }) {
    const queryParams: string[] = [];
    for (const [key, value] of Object.entries(queryObj)) {
      if (value.length > 0 || key === 'page') {
        queryParams.push(`${key}=${value}`);
      }
    }
    return queryParams.length ? `?${queryParams.join('&')}` : '';
  }

  static buildSort(sortObj: {
    type: 'note' | 'date' | 'title',
    order: 'asc' | 'desc'
  }) {
    return `${sortObj.type}=${sortObj.order}`;
  }


  static get(path: string, params: any = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${path}${this.buildQuery(params.filter.value)}&${this.buildSort(params.sort.value)}`);
    return fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    }).then(res => res.json());
  }

  static post(path: string, body: any): Promise<any> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  static put(path: string, body: any): Promise<any> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  static delete(path: string): Promise<any> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(res => res.json());
  }
}