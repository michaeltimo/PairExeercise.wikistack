const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">
    
  <div class="form-group">
  <label for="authorName" class="col-sm-2 control-label">Author Name</label>
  <div class="col-sm-10">
    <input id="authorName" name="authorName" type="text" class="form-control"/>
  </div>
  </div>
    
    <div>
    <div class="form-group">
    <label for="authorEmail" class="col-sm-2 control-label">Author Email</label>
    <div class="col-sm-10">
      <input id="authorEmail" name="authorEmail" type="text" class="form-control"/>
    </div>
    </div>
  </div>
    
    <div class="form-group">
      <label for="pageTitle" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="pageTitle" name="pageTitle" type="text" class="form-control"/>
      </div>
    </div>


    <div class="form-group">
      <label for="contentField" class="col-sm-2 control-label">Content Field</label>
      <div class="col-sm-10">
        <textarea id="contentField" name="contentField" type="text" class="form-control"/> </textarea>
      </div>
    </div>
    
    <div class="form-group">
      <label for="pageStatus" class="col-sm-2 control-label">Page Status</label>
      <div class="col-sm-10">
        <input id="pageStatus" name="pageStatus" type="text" class="form-control"/>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);