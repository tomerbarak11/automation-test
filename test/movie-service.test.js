var assert = require('assert');
var request = require('superagent');
var agent = request.agent();
var host = 'http://localhost:2777/v1'
var videoEndpoint = host + '/videos'
var effectEndpoint = host + '/effect'
var actorsEndpoint = host + '/actors'

/** 
 * -------------------------------------------------------------------------------------------------
 * Videos endpoint tests
 * -------------------------------------------------------------------------------------------------
 */
describe('Video CRUD operations test', function () {
    var lastVideoId;

    it('should insert new video', function (done) {
        agent
            .post(videoEndpoint)
            .send({ Name: "video1", length: 100, Creator: "tomer", Genere: "news" })
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body.Id);
                lastVideoId = res.body.Id;
                done();
            })
    })

    it('should read video', function (done) {
        agent
            .get(videoEndpoint + '/' + lastVideoId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body[0]);
                assert(res.body[0].Id);
                assert(res.body[0].Name);
                assert(res.body[0].length);
                assert(res.body[0].Creator);
                assert(res.body[0].Genere);
                assert.equal(lastVideoId, res.body[0].Id);
                assert.equal('video1', res.body[0].Name);
                assert.equal(100, res.body[0].length);
                assert.equal('tomer', res.body[0].Creator);
                assert.equal('news', res.body[0].Genere);
                done();
            })
    })

    it('should update video', function (done) {
        agent
            .put(videoEndpoint)
            .send({ Id: lastVideoId, Name: "video2", length: 222, Creator: "pini", Genere: "stam" })
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body.Id);
                done();
            })
    })

    it('should read updated video', function (done) {
        agent
            .get(videoEndpoint + '/' + lastVideoId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body[0]);
                assert(res.body[0].Id);
                assert(res.body[0].Name);
                assert(res.body[0].length);
                assert(res.body[0].Creator);
                assert(res.body[0].Genere);
                assert.equal(lastVideoId, res.body[0].Id);
                assert.equal('video2', res.body[0].Name);
                assert.equal(222, res.body[0].length);
                assert.equal('pini', res.body[0].Creator);
                assert.equal('stam', res.body[0].Genere);
                done();
            })
    })

    it('should add effect to video', function (done) {
        agent
            .post(effectEndpoint)
            .send({ Id: lastVideoId, Effect: "some effect" })
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                done();
            })
    })

    it('should get video with added effect', function (done) {
        agent
            .get(videoEndpoint + '/' + lastVideoId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body[0]);
                assert(res.body[0].Effect);
                assert.equal('some effect', res.body[0].Effect);
                done();
            })
    })

    it('should delete video', function (done) {
        agent
            .delete(videoEndpoint + '/' + lastVideoId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                done();
            })
    })

    it('should return nothing becuase video was deleted', function (done) {
        agent
            .get(videoEndpoint + '/' + lastVideoId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert.equal(res.body.length, 0);
                done();
            })
    })
})

/** 
 * -------------------------------------------------------------------------------------------------
 * Actor endpoint tests
 * -------------------------------------------------------------------------------------------------
 */
describe('Actor CRUD operations test', function () {
    var lastActorId;

    it('should insert new actor', function (done) {
        agent
            .post(actorsEndpoint)
            .send({ FirstName: "tomer", LastName: "barak", Age: 30, YearsOfExperience: 10, MainGenere: "genere1" })
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body.Id);
                lastActorId = res.body.Id;
                done();
            })
    })

    it('should read actor', function (done) {
        agent
            .get(actorsEndpoint + '/' + lastActorId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body[0]);
                assert(res.body[0].Id);
                assert(res.body[0].FirstName);
                assert(res.body[0].LastName);
                assert(res.body[0].Age);
                assert(res.body[0].YearsOfExperience);
                assert(res.body[0].MainGenere);
                assert.equal(lastActorId, res.body[0].Id);
                assert.equal('tomer', res.body[0].FirstName);
                assert.equal('barak', res.body[0].LastName);
                assert.equal(30, res.body[0].Age);
                assert.equal(10, res.body[0].YearsOfExperience);
                assert.equal('genere1', res.body[0].MainGenere);
                done();
            })
    })

    it('should update actor', function (done) {
        agent
            .put(actorsEndpoint)
            .send({ Id: lastActorId, FirstName: "pini", LastName: "solomon", Age: 35, YearsOfExperience: 20, MainGenere: "genere2" })
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body.Id);
                done();
            })
    })
    it('should read updated actor', function (done) {
        agent
            .get(actorsEndpoint + '/' + lastActorId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert(res.body[0]);
                assert(res.body[0].Id);
                assert(res.body[0].FirstName);
                assert(res.body[0].LastName);
                assert(res.body[0].Age);
                assert(res.body[0].YearsOfExperience);
                assert(res.body[0].MainGenere);
                assert.equal(lastActorId, res.body[0].Id);
                assert.equal('pini', res.body[0].FirstName);
                assert.equal('solomon', res.body[0].LastName);
                assert.equal(35, res.body[0].Age);
                assert.equal(20, res.body[0].YearsOfExperience);
                assert.equal('genere2', res.body[0].MainGenere);
                done();
            })
    })

    it('should delete actor', function (done) {
        agent
            .delete(actorsEndpoint + '/' + lastActorId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                done();
            })
    })
    it('should return nothing becuase actor was deleted', function (done) {
        agent
            .get(actorsEndpoint + '/' + lastActorId)
            .end(function (err, res) {
                assert.ifError(err);
                assert.equal(200, res.status);
                assert(res.body);
                assert.equal(res.body.length, 0);
                done();
            })
    })
})