function Shipyard(shipConstructor) {
    if (typeof shipConstructor !== 'function') return console.error('Ship Constructor must be a function !')
    console.info('Created shipyard for', shipConstructor.name)
    Object.assign(this, {
        shipConstructor,
        checkAccess: function (ship) {
            return ship instanceof this.shipConstructor ||
                console.error(ship.constructor.name, 'no access to', this.shipConstructor.name, 'shipyard !')
        },
        createShip: function (...args) {
            console.info('Created new', this.shipConstructor.name)
            return new this.shipConstructor(...args)
        },
        changeShipColor: function (ship, color) {
            console.info('Changing color...')
            return Object.assign(ship, {color})
        },
        repairShip: function (ship) {
            if (!this.checkAccess(ship)) return ship;
            console.info('Repairing...')
            return Object.assign(ship, {repaired: Date.now()})
        },
        swapShip: function (ship, ...args) {
            if (!this.checkAccess(ship)) return ship;
            console.info('Swapping...')
            Object.keys(ship).forEach(key => delete ship[key])
            return Object.assign(ship, this.createShip(...args))
        }
    })
}

function MotorShip(power, bodyMaterial) {
    Object.assign(this, {type: 'motor', power, bodyMaterial})
}

function SailShip(sailCount, sailArea) {
    Object.assign(this, {type: 'sail', sailCount, sailArea})
}
