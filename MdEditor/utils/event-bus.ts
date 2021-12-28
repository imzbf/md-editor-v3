export interface BusEvent {
  name: string;
  callback: (p?: any, p2?: any) => any;
}

class Bus {
  // 事件池
  pools: { [race: string]: { [eventName: string]: Array<(p?: any) => any> } } = {};

  // 移除事件监听
  remove(race: string, name: string, func: (p?: any) => any) {
    const targetRace = this.pools[race];
    const events = targetRace && this.pools[race][name];

    if (events) {
      this.pools[race][name] = events.filter((item) => item === func);
    }
  }

  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(race: string) {
    this.pools[race] = {};
  }

  // 注册事件监听
  on(race: string, event: BusEvent) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }

    if (!this.pools[race][event.name]) {
      this.pools[race][event.name] = [];
    }

    this.pools[race][event.name].push(event.callback);
    return this.pools[race][event.name].includes(event.callback);
  }

  // 触发事件
  emit(race: string, name: string, ...params: any) {
    // 存在由于部分组件展示没有监听事件，却触发了事件的情况。现在视为正常情况！
    if (!this.pools[race]) {
      this.pools[race] = {};
    }

    const targetRace = this.pools[race];
    const events = targetRace[name];

    if (events) {
      events.forEach((item) => {
        try {
          item(...params);
        } catch (error) {
          console.error(`${name} monitor event exception！`, error);
        }
      });
    }
  }
}

export default new Bus();
