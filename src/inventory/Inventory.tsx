import React, { createRef, useState } from 'react'
import './styles/Inventory.scss';

import locationIcon from './assets/img/icons/location.svg';
import backpackIcon from './assets/img/icons/backpack.svg';
import cartIcon from './assets/img/icons/cart.svg';

import weightIcon from './assets/img/icons/weight.svg';

import cashIcon from './assets/img/icons/cash.svg';
import creditCardIcon from './assets/img/icons/credit-card.svg';

import trashcanIcon from './assets/img/icons/trash.svg';
import layoutIcon from './assets/img/icons/sections.svg';

import heartIcon from './assets/img/icons/heart.svg';
import armourIcon from './assets/img/icons/armour.svg';
import burgerIcon from './assets/img/icons/burger.svg';
import waterIcon from './assets/img/icons/water.svg';

import testItemIcon from './assets/img/items/jacket.png';

import SectionDescription from './components/section-description';
import SlotsGrid, { GridSlot } from './components/slots-grid';
import RowStatsProperty from './components/row-stats-property';
import EquipmentSlotsGrid, { EquipmentSlot as EquipmentSlot } from './components/equipment-slots-grid';
import LimitedStatsProperty from './components/limited-stats-property';
import DropZoneLabel from './components/drop-zone-label';
import CircleStatsProperty from './components/circle-stats-property';
import { SlotItem } from './components/slot';
import { ContextMenu, SplitModal } from './components/modals';
import DropZone from './components/drop-zone';

export type DragStatus = "None" | "Active" | "Succeed";

export interface GridContainerData {
  rows: number,
  columns: number,
  slots: GridSlot[]
}
export interface EquipmentContainerData {
  slots: EquipmentSlot[]
}

export interface DragData {
  slotId: string | number,
  item: SlotItem,
}

const Inventory = ({ }) => {

  const [inventoryWeight, setInventoryWeight] = useState(94);
  const [inventoryWeightLimit, setInventoryWeightLimit] = useState(100);

  const [cashValue, setCashValue] = useState(1200000);
  const [bankValue, setBankValue] = useState(1200000);

  const [healthValue, setHealthValue] = useState(95);
  const [armourValue, setArmourValue] = useState(95);
  const [foodValue, setFoodValue] = useState(95);
  const [waterValue, setWaterValue] = useState(95);

  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0
  })
  const [contextMenuData, setContextMenuData] = useState({
    isActive: false,
    title: 'Title',
    weight: '250 KG',
    actions: [
      'Выбросить',
      'Разрядить',
      'Действие'
    ]
  })
  const [splitModalData, setSplitModalData] = useState({
    isActive: false,
    title: 'Вы действительно хотите разделить этот предмет?'
  })

  const [dragStatus, setDragStatus] = useState<DragStatus>("None");
  const [dragData, setDragData] = useState<DragData>();

  const [itemsNearContainerData, setItemsNearContainerData] = useState<GridContainerData>({
    columns: 3,
    rows: 10,
    slots: [
      {
        slotId: 1,
        item: {
          sizeX: 2,
          sizeY: 2,
          icon: testItemIcon,
          lowerCentralText: "Рюкзак",
          upperRightText: "1 KG",
          upperLeftText: "2"
        }
      }
    ]
  })
  const [backpackContainerData, setBackpackContainerData] = useState<GridContainerData>({
    columns: 5,
    rows: 10,
    slots: [
      {
        slotId: 1,
        item: {
          sizeX: 2,
          sizeY: 2,
          icon: testItemIcon,
          lowerCentralText: "Рюкзак",
          upperRightText: "1 KG",
          upperLeftText: "2"
        }
      }
    ]
  })
  const [equipmentContainerData, setEquipmentContainerData] = useState<EquipmentContainerData>({
    slots: [
      {
        slotId: 'mask',
        item: {
          sizeX: 2,
          sizeY: 2,
          icon: testItemIcon,
          lowerCentralText: "Рюкзак",
          upperRightText: "1 KG",
          upperLeftText: "2"
        }
      }
    ]
  })

  const onGridSlotDragStart = (e: React.DragEvent, containerData: GridContainerData, setContainerData: (data: GridContainerData) => void, slot: GridSlot) => {
    // Это не трогаем (ghost-image для перетаскиваемого айтема)
    let img = new Image();
    img.src = slot.item?.icon!;
    e.dataTransfer.setDragImage(img, 10, 10);

    setDragData({
      slotId: slot.slotId,
      item: slot.item!
    });

    window.requestAnimationFrame(() => {
      const itemsWithoutDraggedItem = containerData.slots.filter(containerSlot => containerSlot.slotId !== slot.slotId);
      setContainerData({
        ...containerData,
        slots: itemsWithoutDraggedItem
      });
      setDragStatus("Active");
    });
  }

  const onGridSlotDragOver = (e: React.DragEvent, containerData: GridContainerData, setContainerData: (data: GridContainerData) => void, slot: GridSlot) => {
    e.preventDefault();

    // TODO: В этой функции нужно указать какой будет курсор при наведении на слот и как слот будет подсвечиваться (цвет подсветки зависит от возвращаемого значения (true - зеленый, false - красный)).
    // В этом месте просто делаете запрос к клиенту рейджа (там опишете логику, когда и в какие слоты можно ложить, а когда нельзя),
    // вернется из рейджа значение и в зависимости от него выбираете че нужно. 

    // Это вариант когда нельзя положить (курсор со знаком запрещено и красная подсветка)
    // e.dataTransfer.dropEffect = "none";
    // return false;

    // А это вариант когда можно положить
    // e.dataTransfer.dropEffect = "move";
    // return true;

    // То что ниже пишу для примера. Можете оставить, чтобы не писать ту же логику на стороне рейджа
    // Если слот уже занят
    let pass = true;

    if (slot.item)
      pass = false;

    // Если слот вылазит за рамки контейнера
    if (Number(slot.slotId) % containerData.columns + (dragData?.item?.sizeX ?? 1) > containerData.columns ||
      Math.floor(Number(slot.slotId) / containerData.columns) + (dragData?.item?.sizeY ?? 1) > containerData.rows) {

      pass = false;
    }

    e.dataTransfer.dropEffect = pass ? "move" : "none";
    return pass;
  }


  const onGridSlotDrop = (e: React.DragEvent, containerData: GridContainerData, setContainerData: (data: GridContainerData) => void, slot: GridSlot) => {
    if (!dragData)
      return;

    const itemPlacedInDestinationSlot: GridSlot = {
      slotId: slot.slotId,
      item: dragData.item,
    }
    setContainerData({
      ...containerData,
      slots: [
        ...containerData.slots,
        itemPlacedInDestinationSlot
      ]
    });
    setDragStatus("Succeed");
  }

  const onGridSlotDragEnd = (e: React.DragEvent, containerData: GridContainerData, setContainerData: (data: GridContainerData) => void, slot: GridSlot) => {
    if (!dragData)
      return;

    if (dragStatus !== "Succeed") {
      setContainerData({
        ...containerData,
        slots: [
          ...containerData.slots,
          {
            slotId: slot.slotId,
            item: dragData.item
          }
        ]
      });
    }
    setDragStatus("None");
  }

  const onGridSlotContextMenu = (e: React.MouseEvent, containerData: GridContainerData, setContainerData: (data: GridContainerData) => void, slot: GridSlot) => {
    onContextMenu(e, slot);
  }


  const onEquipmentSlotDragStart = (e: React.DragEvent, slot: EquipmentSlot) => {
    setDragData({
      slotId: slot.slotId,
      item: slot.item!
    });

    window.requestAnimationFrame(() => {
      const itemsWithoutDraggedItem = equipmentContainerData.slots.filter(containerSlot => containerSlot.slotId !== slot.slotId);
      setEquipmentContainerData({
        ...equipmentContainerData,
        slots: itemsWithoutDraggedItem
      });
      setDragStatus("Active");
    });
  }
  const onEquipmentSlotDragOver = (e: React.DragEvent, slot: EquipmentSlot) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    return true;
  }
  const onEquipmentSlotDrop = (e: React.DragEvent, slot: EquipmentSlot) => {
    if (!dragData)
      return;

    const itemPlacedInDestinationSlot: EquipmentSlot = {
      slotId: slot.slotId,
      item: dragData.item,
    }
    setEquipmentContainerData({
      ...equipmentContainerData,
      slots: [
        ...equipmentContainerData.slots,
        itemPlacedInDestinationSlot
      ]
    });
    setDragStatus("Succeed");
  }
  const onEquipmentSlotDragEnd = (e: React.DragEvent, slot: EquipmentSlot) => {
    if (!dragData)
      return;

    if (dragStatus !== "Succeed") {
      setEquipmentContainerData({
        ...equipmentContainerData,
        slots: [
          ...equipmentContainerData.slots,
          {
            slotId: slot.slotId,
            item: dragData.item
          }
        ]
      });
    }
    setDragStatus("None");
  }


  const onEquipmentSlotContextMenu = (e: React.MouseEvent, slot: EquipmentSlot) => {
    onContextMenu(e, slot);
  }


  const onContextMenu = (e: React.MouseEvent, slot: EquipmentSlot | GridSlot) => {
    e.preventDefault();

    setModalPosition({
      x: e.clientX,
      y: e.clientY
    })

    setContextMenuData({
      ...contextMenuData,
      isActive: true,
    })
  }
  const onContextMenuActionClick = (e: React.MouseEvent, action: string) => {
    setSplitModalData({
      ...splitModalData,
      isActive: true,
    })
    setContextMenuData({
      ...contextMenuData,
      isActive: false,
    })
  }
  const onModalClose = (e: React.MouseEvent) => {
    e.preventDefault();

    setContextMenuData({
      ...contextMenuData,
      isActive: false,
    })
    setSplitModalData({
      ...splitModalData,
      isActive: false,
    })
  }

  const onSplitSubmit = (value: number) => {

  }
  const onSplitInHalf = () => {

  }

  const onDropZoneDrop = (e: React.DragEvent, zoneId: string) => {

  }
  const onDropZoneDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    return true;
  }


  return (
    <div className='inventory'>
      {(contextMenuData.isActive || splitModalData.isActive) &&
        <div className='modal-container'>
          <div className='modal-fullscreen-wrapper' onClick={onModalClose} onContextMenu={onModalClose} ></div>
          <div className='modal' style={{ top: modalPosition.y, left: modalPosition.x }}>
            {contextMenuData.isActive &&
              <ContextMenu
                title={contextMenuData.title}
                weight={contextMenuData.weight}
                actions={contextMenuData.actions}
                onClose={onModalClose}
                onActionClick={onContextMenuActionClick}
              />
            }
            {splitModalData.isActive &&
              <SplitModal
                title={splitModalData.title}
                onSubmit={onSplitSubmit}
                onSplitInHalf={onSplitInHalf}
              />
            }
          </div>

        </div>
      }
      <div className='inventory__content'>
        <div className='inventory__section'>
          <SectionDescription icon={locationIcon} title="Вещи рядом" text="Вещи, которые валяются рядом с Вами" />
          <div className='inventory__items-near-grid-container'>
            <SlotsGrid
              columnsAmount={itemsNearContainerData.columns}
              rowsAmount={itemsNearContainerData.rows}
              slotWidth='5vw'
              gap='1vw'
              slots={itemsNearContainerData.slots.map(itemData => ({ ...itemData, slotId: Number(itemData.slotId) }))}
              onDragStart={(e, slot) => onGridSlotDragStart(e, itemsNearContainerData, setItemsNearContainerData, slot)}
              onDragOver={(e, slot) => onGridSlotDragOver(e, itemsNearContainerData, setItemsNearContainerData, slot)}
              onDrop={(e, slot) => onGridSlotDrop(e, itemsNearContainerData, setItemsNearContainerData, slot)}
              onDragEnd={(e, slot) => onGridSlotDragEnd(e, itemsNearContainerData, setItemsNearContainerData, slot)}
              onContextMenu={(e, slot) => onGridSlotContextMenu(e, itemsNearContainerData, setItemsNearContainerData, slot)}
            />
          </div>
          <div className='inventory__row-stats'>
            <RowStatsProperty icon={cashIcon} title='Наличка' value={`$ ${cashValue}`} />
            <RowStatsProperty icon={creditCardIcon} title='В банке' value={`$ ${bankValue}`} />
          </div>
        </div>
        <div className='inventory__section'>
          <SectionDescription icon={backpackIcon} title="Инвентарь" text="Вещи, которые имеет Ваш персонаж находятся тут" />
          <EquipmentSlotsGrid
            slots={equipmentContainerData.slots}
            onDragStart={onEquipmentSlotDragStart}
            onDragOver={onEquipmentSlotDragOver}
            onDrop={onEquipmentSlotDrop}
            onDragEnd={onEquipmentSlotDragEnd}
            onContextMenu={(e, slot) => onEquipmentSlotContextMenu(e, slot)}
          />
        </div>
        <div className='inventory__section'>
          <div className='inventory__section-header'>
            <SectionDescription icon={cartIcon} title="Ваши предметы" text="Предметы, которые у Вас за спиной." />
            <LimitedStatsProperty icon={weightIcon} title='Вес Инвентаря' value={`${inventoryWeight}`} limit={`${inventoryWeightLimit} KG`} />
          </div>
          <SlotsGrid
            columnsAmount={backpackContainerData.columns}
            rowsAmount={backpackContainerData.rows}
            slotWidth='5vw'
            gap='1vw'
            slots={backpackContainerData.slots.map(itemData => ({ ...itemData, slotId: Number(itemData.slotId) }))}
            onDragStart={(e, slot) => onGridSlotDragStart(e, backpackContainerData, setBackpackContainerData, slot)}
            onDragOver={(e, slot) => onGridSlotDragOver(e, backpackContainerData, setBackpackContainerData, slot)}
            onDrop={(e, slot) => onGridSlotDrop(e, backpackContainerData, setBackpackContainerData, slot)}
            onDragEnd={(e, slot) => onGridSlotDragEnd(e, backpackContainerData, setBackpackContainerData, slot)}
            onContextMenu={(e, slot) => onGridSlotContextMenu(e, backpackContainerData, setBackpackContainerData, slot)}
          />
          <div className='inventory__circle-stats'>
            <CircleStatsProperty value={healthValue} icon={heartIcon} color='#FF2B2B' />
            <CircleStatsProperty value={armourValue} icon={armourIcon} color='#36C6F4' />
            <CircleStatsProperty value={foodValue} icon={burgerIcon} color='#F4CA36' />
            <CircleStatsProperty value={waterValue} icon={waterIcon} color='#A7E5F9' />
          </div>
        </div>
      </div>
      <div className='inventory__drop-zones'>
        <div className='inventory__drop-zone-container'>
          <DropZone icon={trashcanIcon} title='Выбросить' description='Предмет будет выброшен рядом с Вами'
            onDragOver={(e: React.DragEvent) => onDropZoneDragOver(e, 'drop')}
            onDrop={(e: React.DragEvent) => onDropZoneDrop(e, 'drop')}
          />
        </div>
        <div className='inventory__drop-zone-container'>
          <DropZone icon={layoutIcon} title='Разделить' description='Предмет будет разделен на указанное Вами кол-во'
            onDragOver={(e: React.DragEvent) => onDropZoneDragOver(e, 'split')}
            onDrop={(e: React.DragEvent) => onDropZoneDrop(e, 'split')}
          />
        </div>
      </div>
    </div>
  )
}

export default Inventory;