; layui.define(['admin', 'table'], function (e) {
    var table = layui.table,
        data = [
            {
                "id": 10000,
                "username": "user-0",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0",
                "experience": 255,
                "logins": 24,
                "wealth": 82830700,
                "classify": "作家",
                "score": 57
            },
          {
              "id": 10001,
              "username": "user-1",
              "sex": "男",
              "city": "城市-1",
              "sign": "签名-1",
              "experience": 884,
              "logins": 58,
              "wealth": 64928690,
              "classify": "词人",
              "score": 27
          }
        ];

    table.render({
        elem: '#table'
        , height: 315
        , data: data
        , page: true
        , even:true
        , cols: [[
            { type: 'numbers' }
      , { type: 'checkbox' }
          , { field: 'username', title: '用户名', width: 80 }
          , { field: 'sex', title: '性别', width: 80, sort: true }
          , { field: 'city', title: '城市', width: 80 }
          , { field: 'sign', title: '签名', width: 177 }
          , { field: 'experience', title: '积分', width: 80, sort: true }
          , { field: 'score', title: '评分', width: 80, sort: true }
          , { field: 'classify', title: '职业', width: 80 }
          , { field: 'wealth', title: '财富', width: 135, sort: true }
        ]]
    });

    e('index', {})
});