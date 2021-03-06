Ext.define('sunerp.view.sophancong.SoPhanCongList', {
    extend: 'sunerp.view.core.BaseListEditView',
    requires: [
        'sunerp.component.CongViecPicker',
        'sunerp.component.CongViecPicker',
        'sunerp.component.NhanVienCb',
        'sunerp.component.NhanVienPicker',
        'sunerp.component.MonthCb',
        'sunerp.controller.sophancong.SoPhanCongListCtr'
    ],
    alias: 'widget.soPhanCongList',
    controller: 'sunerp.controller.sophancong.SoPhanCongListCtr',
    inject: ['soPhanCongStore', 'taskStore'],
    config: {
        taskStore: null,
        soPhanCongStore: null
    },
    initComponent: function () {
        var me = this;
        me.store = me.getSoPhanCongStore();
        me.columns = [
            {xtype: 'rownumberer'},
            {
                header: 'Mã NV',
                dataIndex: 'nhanVien.maNv',
                width: 100,
                locked: true,
                editor: {
                    xtype: 'nhanviencb',
                    gird: me
                }
            },
            {
                header: 'Công việc',
                dataIndex: 'task.name',
                width: 200,
                sortable: false,
                locked: true,
                editor: {
                    xtype: 'congviecpicker',
                    gird: me,
                    displayField: 'name'
                }
            },
            {
                header: 'Khối lượng',
                dataIndex: 'khoiLuong',
                width: 100,
                xtype: 'numbercolumn',
                locked: true,
                editor: {
                    xtype: 'numberfield'
                }
            },
            {
                header: 'Giờ',
                dataIndex: 'gio',
                width: 80,
                xtype: 'numbercolumn',
                locked: true,
                editor: {
                    xtype: 'numberfield'
                }
            },
            {
                header: 'Ghi chú',
                dataIndex: 'ghiChu',
                width: 160,
                locked: true,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                header: 'Ngày phân công',
                dataIndex: 'ngayPhanCong',
                xtype: 'datecolumn',
                format: 'd-m-Y',
                width: 120,
                locked: true,
                editor: {
                    xtype: 'datefield',
                    format: 'd-m-Y'
                }
            },
            {
                header: 'Chủ Nhật', dataIndex: 'soPhanCongExt.chuNhat', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'Việc riêng', dataIndex: 'soPhanCongExt.viecRieng', width: 90,
                xtype: 'checkcolumn'
            },
            {
                header: 'Làm đêm', dataIndex: 'soPhanCongExt.lamDem', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'BHLD', dataIndex: 'soPhanCongExt.baoHoLaoDong', width: 70,
                xtype: 'checkcolumn'
            },
            {
                header: 'Độc hại', dataIndex: 'soPhanCongExt.docHai', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'Lễ', dataIndex: 'soPhanCongExt.le', width: 40,
                xtype: 'checkcolumn'
            },
            {
                header: 'Tết', dataIndex: 'soPhanCongExt.tet', width: 50,
                xtype: 'checkcolumn'
            },
            {
                header: 'Thai sản', dataIndex: 'soPhanCongExt.thaiSan', width: 90,
                xtype: 'checkcolumn'
            },
            {
                header: 'Đau ốm', dataIndex: 'soPhanCongExt.dauOm', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'Con ốm', dataIndex: 'soPhanCongExt.conOm', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'Tai nạn LD', dataIndex: 'soPhanCongExt.taiNanLd', width: 100,
                xtype: 'checkcolumn'
            },
            {
                header: 'Họp', dataIndex: 'soPhanCongExt.hop', width: 50,
                xtype: 'checkcolumn'
            },
            {
                header: 'Học DH', dataIndex: 'soPhanCongExt.hocDaiHan', width: 80,
                xtype: 'checkcolumn'
            },
            {
                header: 'Học ĐX', dataIndex: 'soPhanCongExt.hocDotXuat', width: 80,
                xtype: 'checkcolumn'
            }
        ];

        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        });


        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        me.plugins = [me.cellEditing];

        me.features = [
            {ftype: 'grouping'}
        ];

        me.callParent(arguments);
    },
    getTBar: function () {
        var tbar = this.callParent(arguments);
        tbar = Ext.Array.insert(tbar, 1, [
            {
                xtype: 'monthcb',
                name: 'Tháng',
                width: 100
            }
        ]);
        return tbar;
    }
});