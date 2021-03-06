/**
 * Created by dungvn3000 on 3/18/14.
 */
Ext.define('sunerp.view.nhanvien.NhanVienList', {
    extend: 'sunerp.view.core.BaseListView',
    alias: 'widget.nhanVienList',
    requires: ['sunerp.controller.nhanvien.NhanVienListCtr'],
    controller: 'sunerp.controller.nhanvien.NhanVienListCtr',
    inject: ['nhanVienStore'],
    config: {
        nhanVienStore: null
    },
    initComponent: function () {
        var me = this;
        me.store = this.getNhanVienStore();
        me.columns = [
            {xtype: 'rownumberer'},
            {header: 'Mã NV', dataIndex: 'maNv', flex: 1},
            {header: 'Tên', dataIndex: 'firstName', flex: 1},
            {header: 'Họ', dataIndex: 'lastName', flex: 1},
            {
                header: 'Chức vụ',
                dataIndex: 'chucVu.name',
                flex: 1
            },
            {
                header: 'Phòng bang',
                dataIndex: 'phongBang.name',
                flex: 1
            },
            {header: 'Hệ số lương', dataIndex: 'heSoLuong', flex: 1},
            {
                xtype: 'actioncolumn',
                header: 'Option',
                sortable: false,
                menuDisabled: true,
                items: [this.deleteBtn()]
            }
        ];
        me.callParent(arguments);
    }
});