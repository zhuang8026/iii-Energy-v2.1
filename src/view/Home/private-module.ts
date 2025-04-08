// images
import IconTV from '@/assets/images/icon-television.svg';
import BgTV from '@/assets/images/icon_bg/tv.svg'; // no use
import IconRefrigerator from '@/assets/images/icon-refrigerator.svg';
import BgRefrigerator from '@/assets/images/icon_bg/dehumidifier.svg'; // no use
import IconAirConditioner from '@/assets/images/icon-airConditioner.svg';
import BgAC from '@/assets/images/icon_bg/ac.svg'; // no use
import IconDrinkMachine from '@/assets/images/icon-drinkMachine.svg';
import BgDrinkMachine from '@/assets/images/icon_bg/drinkMachine.svg'; // no use
import IconWashMachine from '@/assets/images/icon-washMachine.svg';
import BgWashMachine from '@/assets/images/icon_bg/washMachine.svg'; // no use
import IconFan from '@/assets/images/icon-fan.svg';
import BgFan from '@/assets/images/icon_bg/Fan.svg'; // no use
import IconComputer from '@/assets/images/icon-computer.svg';
import BgPC from '@/assets/images/icon_bg/computer.svg'; // no use
import IconPot from '@/assets/images/icon-electricPot.svg';
import BgPot from '@/assets/images/icon_bg/electricPot.svg'; // no use
import IconDehumidifier from '@/assets/images/icon-dehumidifier.svg';
import BgDehumidifier from '@/assets/images/icon_bg/dehumidifier.svg'; // no use
import IconOther from '@/assets/images/icon-other.svg';
import BgOther from '@/assets/images/icon_bg/other.svg'; // no use

// Icon map
const iconMap = {
    tv: { name: 'television', icon: IconTV, background: BgTV },
    fridge: { name: 'refrigerator', icon: IconRefrigerator, background: BgRefrigerator },
    ac: { name: 'airConditioner', icon: IconAirConditioner, background: BgAC },
    water_boiler: { name: 'drinkMachine', icon: IconDrinkMachine, background: BgDrinkMachine },
    washing_machine: { name: 'washMachine', icon: IconWashMachine, background: BgWashMachine },
    electric_fan: { name: 'fan', icon: IconFan, background: BgFan },
    computer: { name: 'computer', icon: IconComputer, background: BgPC },
    electric_pot: { name: 'electricPot', icon: IconPot, background: BgPot },
    dehumidifier: { name: 'dehumidifier', icon: IconDehumidifier, background: BgDehumidifier },
    other: { name: 'otherMachine', icon: IconOther, background: BgOther }
};

export { iconMap };
