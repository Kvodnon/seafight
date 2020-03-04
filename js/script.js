const record = document.getElementById('record'),
  shot = document.getElementById('shot'),
  hit = document.getElementById('hit'),
  dead = document.getElementById('dead'),
  enemy = document.getElementById('enemy'),
  again = document.getElementById('again'),
  play = {
    record: 0,
    hit: 0,
    shot: 0,
    dead: 0,
    set updateData(data) {
      this[data]++;
      this.render();
    },
    render() {
      record.textContent = this.record;
      shot.textContent = this.shot;
      hit.textContent = this.hit;
      dead.textContent = this.dead;
    }
  };

const show = {
  hit: function() {

  },
  miss: function(boat) {
    this.changeClass(boat, 'miss');
  },
  dead: function() {

  },
  changeClass: function(element, className) {
    element.className = className;
  }
};

const fire = (event) => {
  const target = event.target;
  
  if (target.classList.contains('miss')) return;
  
  show.miss(target);
  play.updateData = 'shot';
};

const init = () => {
  enemy.addEventListener('click', fire);
};

init();