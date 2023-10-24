function axiosRequest(type, path, params){
    return $.ajax({
        url: path,
        type: type,
        dataType: "json",
        data: params,
        success: function(data){
        },
        error: function(jqXHR, textStatus, err){
            
            console.log(textStatus, err);
        }
    });
}