const record = document.getElementById('record'),
  shot = document.getElementById('shot'),
  hit = document.getElementById('hit'),
  dead = document.getElementById('dead'),
  enemy = document.getElementById('enemy'),
  again = document.getElementById('again'),
  header = document.querySelector('.header');

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
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
  }
  game = {
    ships: [
      {
        location: ['26', '36', '46', '56'],
        hit: ['', '', '', '']
      },
      {
        location: ['11', '12', '13'],
        hit: ['', '', '']
      },
      {
        location: ['69', '79'],
        hit: ['', '']
      },
      {
        location: ['32'],
        hit: ['']
      }
    ],
    shipCount: 4
  };

const show = {
  hit: function(boat) {
    this.changeClass(boat, 'hit');
  },
  miss: function(boat) {
    this.changeClass(boat, 'miss');
  },
  dead: function(boat) {
    this.changeClass(boat, 'dead');
  },
  changeClass: function(element, className) {
    element.className = className;
  }
};

const fire = (event) => {
  const target = event.target;
  let life;
  
  if (target.classList.contains('miss') || target.classList.contains('hit') || target.tagName !== 'TD') return;
  
  show.miss(target);
  play.updateData = 'shot';
  
  for (const ship of game.ships) {
    const index = ship.location.indexOf(target.id);
    
    if (index >= 0) {
      show.hit(target);
      play.updateData = 'hit';
      ship.hit[index] = 'x';

      life = ship.hit.indexOf('');

      if (life < 0) {
        play.updateData = 'dead';
        
        for (const cell of ship.location) {
          show.dead(document.getElementById(cell));
        }
      
        game.shipCount--;
    
        if (game.shipCount < 1) {
          header.textContent = 'Игра Окончена';
          header.style.backgroundColor = 'red';
      
          if (play.shot < play.record || play.record === 0) {
            localStorage.setItem('seaBattleRecord', play.shot);
            play.record = play.shot;
            play.render();
          }

          enemy.removeEventListener('click', fire);
        }
      }
    }

  }

};

const init = () => {
  enemy.addEventListener('click', fire);
  play.render();

  again.addEventListener('click', () => {
    location.reload();
  });
};

init();