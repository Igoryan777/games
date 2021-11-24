const createGame = (name, year, genre, srcImg, price) => ({name, year, genre, srcImg, price})
const log = (car, status, date = new Date()) => ({car, status, date})

const games = [
    createGame('GTA 5', 2015, 'Action, Racing, 3D', 'img/gta5.jpg', 399.99),
    createGame('Metro Exodus', 2019, 'Action', 'img/metro_exodus.jpg', 259.99 ),
    createGame('Red Dead Redemption 2', 2019, 'Action (Shooter) / Adventure / Western / Open World', 'img/rdr2.jpg', 999.99),
    createGame('Euro Truck Simulator 2', 2013, 'Simulator', 'img/ets2.jpg', 89.99),
];

;new Vue({
    el: '#myapp',
    data: {
        selectedId: 0,
        game: games[0],
        gameList: games,
        logs: [],
        phoneVisibility: false,
        gameInfo: true,
        search: '',
        popup: false
    },
    methods: {
        selectElement: function (index, games = this.gameList) {
            this.selectedId = index;
            this.game = games[index];
        },

        orderBuy: function () {
            this.popup = false;
            this.logs.push(
                log(`${this.game.name} - ${this.game.genre}`, 'buy')
            )
        },

        closeOrder: function () {
            this.popup = false;
            this.logs.push(
                log(`${this.game.name} - ${this.game.genre}`, 'close')
            )
        }
    },
    computed: {
        phoneBtn: function () {
            return this.phoneVisibility ? 'Hide phone...' : 'Show phone';
        },

        searchGames: function () {
            let filteredList = this.gameList
            filteredList = games.filter( game => game.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || game.genre.toLowerCase().indexOf(this.search.toLowerCase()) > -1)

            if (filteredList.length === 1) {
                this.selectElement(filteredList.length - 1, filteredList);
            } else if(filteredList.length === 0) {
                this.gameInfo = false;
            } else {
                this.gameInfo = true;
                this.selectElement(0, filteredList);
            }

            this.gameList = filteredList;
            return filteredList;
        }
    },

    filters: {
        date: function (value) {
            return value.toLocaleString()
        }
    }
})