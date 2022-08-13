import {injectable} from "inversify";

@injectable()
class Katana {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken {
    throw(): string {
        return "hit!";
    }
}


@injectable()
class Ninja {
    constructor(
        private readonly _katana: Katana,
        private readonly _shuriken: Shuriken
    ) {
    }

    fight(): string {
        return this._katana.hit();
        // return this.katana.hit();
    }

    sneak(): string {
        return this._shuriken.throw();
        // return this.shuriken.throw();
    }
}

export {Ninja, Katana, Shuriken};