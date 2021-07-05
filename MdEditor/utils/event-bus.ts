export interface BusEvent {
  name: string;
  callback: Function;
}

class Bus {
  // 事件池
  pools: { [key: string]: Array<Function> } = {};

  // 移除事件监听
  remove(name: string, func: Function) {
    const events = this.pools[name];

    if (events) {
      this.pools[name] = events.filter((item) => item === func);
    }
  }

  // 注册事件监听
  on(event: BusEvent) {
    if (this.pools[event.name] === undefined) {
      this.pools[event.name] = [];
    }

    this.pools[event.name].push(event.callback);
    return this.pools[event.name].includes(event.callback);
  }

  // 触发事件
  emit(name: string, params: any) {
    const events = this.pools[name];

    if (events) {
      events.forEach((item) => {
        try {
          item(params);
        } catch (error) {
          console.error(`${name}监听事件执行异常！`);
        }
      });
    }
  }
}

export default new Bus();
