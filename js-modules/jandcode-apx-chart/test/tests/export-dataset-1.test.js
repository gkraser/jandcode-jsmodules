import {apx} from '../vendor'
import * as m from '../../src/utils/export-dataset'

describe(__filename, function() {

    let data = [
        {dt: 1, f1: '11', f2: '111'},
        {dt: 2, f1: '22', f2: '222', f3: '333', f4: null},
    ]

    let data2 = [
        {dt: 1, f1: '11-j', f3: '333-j', f5: null},
        {dt: 3, f1: '33', f2: '333'},
    ]

    let z = apx

    it("1", function() {
        let ds = new m.ExportDataset()
        ds.addData(data)
        ds.joinData(data2, 'dt')
        ds.setFieldInfoDefault({
            f1: {
                title: 'Поле F1'
            }
        })
        ds.setFieldInfoDefault({
            f2: {
                title: 'F2 поле'
            },
            f3: {
                title: 'F3 поле'
            },
            f4: {
                title: 'F4 поле'
            }
        })
        //
        ds.addFieldInfo({name: 'dt', title: 'Дата'})
        ds.addFieldInfo({name: 'f1', ignore: true})
        //
        console.table(ds.getFields());
        console.table(ds.getData());
    })

})

