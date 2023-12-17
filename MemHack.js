// Usage:
// At top of main: import MemHack from './MemHack'
// At top of loop(): MemHack.pretick()
// Thats it!
const MemHack = {
  shardEnable: ['shard3','shard1','shard2','shard0'],
  memory: null,
  parseTime: -1,
  register () {
    const start = Game.cpu.getUsed()
    this.memory = Memory
    const end = Game.cpu.getUsed()
    this.parseTime = end - start
    this.memory = RawMemory._parsed
  },
  pretick () {
    if (!this.shardEnable.includes(Game.shard.name)) {
        return;
    }
    delete global.Memory
    global.Memory = this.memory
    RawMemory._parsed = this.memory
    //console.log('MemHack.pretick', this.parseTime);
  }
}

if (MemHack.shardEnable.includes(Game.shard.name)) {
    MemHack.register();
}
module.exports = MemHack; 
